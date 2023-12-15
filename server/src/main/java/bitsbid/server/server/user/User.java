package bitsbid.server.server.user;

import com.github.javafaker.Faker;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private long id;
    private String fullName;
    private String email;
    private String fakeName;
    private String pictureUrl;

    public User(long id, String fullName, String email, String pictureUrl) {
        Faker faker=new Faker();
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.fakeName=faker.name().firstName()+" "+faker.name().lastName();
    }
}
