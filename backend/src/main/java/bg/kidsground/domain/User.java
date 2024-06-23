package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
  @Id
  @Column(name = "user_id", length = 45)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "username", length = 255)
  private String username;

  @Column(name = "password", length = 255)
  private String password;

  @Column(name = "email", length = 255)
  private String email;

  @JsonProperty("role")
  private UserRole role;

  public User() {
  }

  public User(Long id, String username, String password, String email) {
    super();
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }


  @Override
  public String toString() {
    return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + "]";
  }

}