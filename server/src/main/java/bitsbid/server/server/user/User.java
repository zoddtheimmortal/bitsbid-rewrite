package bitsbid.server.server.user;

import bitsbid.server.server.wallet.Wallet;
import com.github.javafaker.Faker;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Data
public class User {
    @Id
    private String email;
    private String fullName;
    private String fakeName;
    private String pictureUrl;

    @OneToOne(cascade = CascadeType.ALL)
    private Wallet wallet;

    public User(String email, String fullName, String pictureUrl) {
        Faker faker=new Faker();
        this.fullName = fullName;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.wallet=new Wallet(5000L);
        this.fakeName=faker.name().firstName()+" "+faker.name().lastName();
    }
}
