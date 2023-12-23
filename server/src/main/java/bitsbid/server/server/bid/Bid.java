package bitsbid.server.server.bid;


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
@ToString
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long item_id;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yy-MM-dd hh:mm::ss")
    private Timestamp time;
    private Long amount;
    private String email;

    public Bid(Long id, Long item_id, Long amount, String email) {
        this.id = id;
        this.item_id = item_id;
        this.amount = amount;
        this.email = email;
    }
}
