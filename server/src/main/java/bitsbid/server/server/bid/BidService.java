package bitsbid.server.server.bid;

import bitsbid.server.server.item.Item;
import bitsbid.server.server.item.ItemRepository;
import bitsbid.server.server.user.User;
import bitsbid.server.server.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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

    public List<Item> findByUserId(Long user_id){
        return itemRepository.findByUserId(user_id);
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

    
}
