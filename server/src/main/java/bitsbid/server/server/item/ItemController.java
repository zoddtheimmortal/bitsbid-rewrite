package bitsbid.server.server.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllItems(){
        List<Item> allItems=  this.itemService.showAllItems();
        return new ResponseEntity<>(allItems, HttpStatus.OK);
    }

//    @GetMapping("/find/{id}")
//    public ResponseEntity<?> findItem(@PathVariable Long id){
//        Item item = this.itemService.
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id){
        Item item = itemService.deleteProduct(id);
        if(item!=null){
            return new ResponseEntity<>(item, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody Item item){
        try{
            this.itemService.addItem(item);
            return new ResponseEntity<>(item,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        }
    }
}
