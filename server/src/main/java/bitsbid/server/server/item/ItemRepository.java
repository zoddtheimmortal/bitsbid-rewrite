package bitsbid.server.server.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long> {
    @Override
    Optional<Item> findById(Long aLong);

    @Query("SELECT record FROM Item record WHERE record.email=?1")
    public List<Item> findByEmail(String email);

    @Query("SELECT record FROM Item record WHERE record.isActive=true")
    public List<Item> findAllActiveItems();
}
