package bitsbid.server.server.item;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long> {
    @Override
    Optional<Item> findById(Long aLong);
}
