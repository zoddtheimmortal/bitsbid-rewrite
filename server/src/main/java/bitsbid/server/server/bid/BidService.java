package bitsbid.server.server.bid;

import bitsbid.server.server.item.Item;
import bitsbid.server.server.item.ItemRepository;
import bitsbid.server.server.user.User;
import bitsbid.server.server.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserRepository userRepository;

    public BidService(BidRepository bidRepository, ItemRepository itemRepository, UserRepository userRepository) {
        this.bidRepository = bidRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }
    public List<Bid> showAllBids(){
        return bidRepository.findAll();
    }

    public List<Item> findByEmail(String email){
        return itemRepository.findByEmail(email);
    }

    public List<Bid> findByItemId(Long item_id){
        return bidRepository.findByItemId(item_id);
    }

    public List<Item> showActiveItems(){
        return itemRepository.findAllActiveItems();
    }

    public User findWinnerOfAuction(Long item_id){
        List<Bid> allBids=bidRepository.findByItemId(item_id);
        if(allBids!=null){
            Bid maxBid=new Bid();
            long max=-1;
            for(Bid bid:allBids){
                if(bid.amount>max){
                    max=bid.amount;
                    maxBid=bid;
                }
            }
            return userRepository.findByEmail(maxBid.user.getEmail()).orElse(null);
        }
        return null;
    }

    public Item startAuction(Long id, int min){
        Item item=itemRepository.findById(id).orElse(null);
        if(item!=null){
            item.setActive(true);

            Timestamp starts=new Timestamp(System.currentTimeMillis());
            item.setStarted(starts);
            Calendar calendar=Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.MINUTE,min);
            Timestamp ends=new Timestamp(calendar.getTimeInMillis());
            item.setEnds(ends);
        }
        return null;
    }

    public Item findAuctionById(Long id){
        return itemRepository.findById(id).orElse(null);
    }

    public Item buyItem(Long item_id){
        Item item=itemRepository.findById(item_id).orElse(null);
        assert item != null;
        item.setBoughtFlag(true);
        item.setActive(false);
        itemRepository.save(item);
        return item;
    }

    public Bid addNewBid(Bid bid, String email,Long item_id){
        Item item=itemRepository.findById(item_id).get();
        item.setHasBids(true);
        User user=userRepository.findByEmail(email).orElse(null);
        if(user!=null) {
            long balance = user.getWallet().getBalance();
            long maxBid = 0;
            List<Bid> allBids = findByItemId(item_id);
            for (Bid prevBid : allBids) {
                if (Objects.equals(prevBid.getUser().getEmail(), email)) {
                    if (prevBid.getAmount() > maxBid) maxBid = prevBid.getAmount();
                }
            }
            if (maxBid < bid.getAmount() && bid.getAmount() > item.getBuyPrice()) {
                user.getWallet().setBalance(balance + maxBid);
                user.getWallet().setGhostBalance(user.getWallet().getGhostBalance() - maxBid);
                balance = (long) user.getWallet().getBalance();

                if (balance >= bid.getAmount()) {
                    bid.setId(new Random().nextLong());
                    Timestamp time = new Timestamp(System.currentTimeMillis());
                    Bid newBid = new Bid(bid.getItem_id(), time, bid.getAmount(), bid.getEmail());
                    user.getWallet().setBalance(balance - bid.getAmount());
                    user.getWallet().setGhostBalance(user.getWallet().getGhostBalance() + bid.getAmount());
                    bidRepository.save(newBid);
                    //updating current highest bid in auction
                    if (item.getCurrentPrice() < bid.getAmount()) item.setCurrentPrice(bid.getAmount());
                    item.setNumberOfBids(item.getNumberOfBids() + 1); // one more bid is added to the auction lisitng
                    itemRepository.save(item);
                    return bid;
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    public Item killAuction(Long item_id){
        Item item=itemRepository.findById(item_id).get();
        Date ends_stamp=new Date(item.getEnds().getTime());
        Date now=new Date();
        item.setActive(false);
        itemRepository.save(item);
        List<Bid> allBids=bidRepository.findByItemId(item_id);
        if(allBids!=null){
            Bid maxBid=new Bid();
            long max=-1;
            HashMap<String,Long> prevAmt=new HashMap<>();
            System.out.println(allBids);
            for (Bid allBid : allBids) {
                if (max < allBid.getAmount()) {
                    max = allBid.getAmount();
                    maxBid = allBid;
                }
                if(prevAmt.get(allBid.getEmail())!=null){
                    if(prevAmt.get(allBid.getEmail())<allBid.getAmount()){
                        System.out.println(allBid.getAmount());
                        prevAmt.put(allBid.getEmail(),allBid.getAmount());
                    }
                }
                else{
                    prevAmt.put(allBid.getEmail(),(long)0);
                    if(prevAmt.get(allBid.getEmail())<allBid.getAmount()){
                        System.out.println(allBid.getAmount());
                        prevAmt.put(allBid.getEmail(),allBid.getAmount());
                    }
                }
            }
            System.out.println(prevAmt);
            User winner=userRepository.findByEmail(maxBid.getUser().getEmail()).orElse(null);
            User seller=userRepository.findByEmail(item.getEmail()).orElse(null);
            if(winner!=null){
                Set<String> idSet=prevAmt.keySet();
                for(String emails:idSet){
                    User user=userRepository.findByEmail(emails).orElse(null);
                    if(user!=null && !Objects.equals(user.getEmail(), winner.getEmail())){
                        System.out.println(emails+" "+prevAmt.get(emails));
                        user.getWallet().setBalance(user.getWallet().getBalance()+prevAmt.get(emails));
                        user.getWallet().setGhostBalance(user.getWallet().getGhostBalance()-prevAmt.get(emails));
                        userRepository.save(user);
                    }
                }
                item.setBoughtFlag(true);
                item.setSoldTo(winner.getEmail());
                itemRepository.save(item);
                winner.getWallet().setGhostBalance(winner.getWallet().getGhostBalance()-maxBid.getAmount());
                assert seller != null;
                seller.getWallet().setBalance(seller.getWallet().getBalance()+maxBid.getAmount());
                userRepository.save(winner);
            }
        }
        return item;
    }


    public List<Bid> showItemBids(Long itemId){
        List<Bid> allBids=bidRepository.findAll();
        List<Bid> itemBids=new ArrayList<>();

        for(Bid bid:allBids){
            if(Objects.equals(bid.getItem_id(), itemId)){
                itemBids.add(bid);
            }
        }

        return itemBids;
    }

    public Bid deleteBid(Long id){
        Bid bid=bidRepository.findById(id).get();
        try{
            bidRepository.deleteById(id);
            return bid;
        }catch (Exception e){
            //add logs later
            return null;
        }
    }
}
