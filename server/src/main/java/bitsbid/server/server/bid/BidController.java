package bitsbid.server.server.bid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping("/all")
    public ResponseEntity<?> showAllBids(){
        List<Bid> allBids=bidService.showAllBids();
        if(allBids!=null){
            return new ResponseEntity<>(allBids, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<?> showItemBids(@PathVariable Long itemId){
        List<Bid> itemBids=bidService.showItemBids(itemId);
        if(itemBids!=null){
            return new ResponseEntity<>(itemBids, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
