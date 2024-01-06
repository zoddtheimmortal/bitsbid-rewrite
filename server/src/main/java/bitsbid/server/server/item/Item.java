package bitsbid.server.server.item;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Item {
    @Id
    @GeneratedValue
    private Long id;
    private Long userid;
    private String name;
    private String description;
    private Long buyPrice;
    private Long currentPrice;
    private Long firstBid;
    private int numberOfBids;
    private String img;
    private boolean isActive;
    private boolean boughtFlag;
    private boolean hasImages;
    private boolean hasBids;
    private Long soldTo;
    Timestamp Started;
    Timestamp Ends;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yy-MM-dd hh:mm:ss")
    private Date dateCreated=new Date(new Date().getTime());

    public Item(Long userid, String name, String description, String img) {
        this.userid = userid;
        this.name = name;
        this.description = description;
        this.img = img;
    }
}
