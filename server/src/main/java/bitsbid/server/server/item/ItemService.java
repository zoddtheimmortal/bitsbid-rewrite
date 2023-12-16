package bitsbid.server.server.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> showAllItems(){
        return this.itemRepository.findAll();
    }

    public Item addItem(Item item){
        itemRepository.save(item);
        return  item;
    }

    public Item updateProduct(Item item) {
        itemRepository.save(item);
        return item;
    }

    public Item deleteProduct(long id) {
        try{
            Item entity=itemRepository.findById(id).get();
            itemRepository.delete(entity);
            return entity;
        }catch (Exception e){
            return null;
        }
    }
}
