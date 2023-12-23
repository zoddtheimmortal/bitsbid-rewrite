package bitsbid.server.server.bid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;

    public List<Bid> showAllBids(){
        return bidRepository.findAll();
    }

    public List<Bid> showItemBids(Long itemId){
        List<Bid> allBids=bidRepository.findAll();
        List<Bid> itemBids=new ArrayList<>();

        for(Bid bid:allBids){
            if(bid.getItem_id()==itemId){
                itemBids.add(bid);
            }
        }

        return itemBids;
    }
}
