package bitsbid.server.server.bid;


import bitsbid.server.server.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long user_id;
    Long item_id;
    Timestamp time;
    Long amount;
    String email;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "email",insertable = false,updatable = false)
    User user;

    public Bid(Long id, Long user_id, Long item_id, Timestamp time, Long amount, String email) {
        this.id = id;
        this.user_id = user_id;
        this.item_id = item_id;
        this.time = time;
    }
}