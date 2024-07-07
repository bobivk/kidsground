package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode
@AllArgsConstructor
@Builder
public class User {
  @Id
  @Column(name = "id", length = 45)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  //@Column(name = "username", length = 255)
  @JsonProperty("username")
  private String username;

  //@Column(name = "password", length = 255)
  @JsonProperty("password")
  private String password;

  //@Column(name = "email", length = 255)
  @JsonProperty("email")
  private String email;

  @JsonProperty("role")
  private UserRole role;

  public User() {
  }

  public User(String username, String password, String email, UserRole userRole) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = userRole;
  }


  @Override
  public String toString() {
    return "User [id=" + id + ", username=" + username + ", email=" + email + ", role=" + role + "]";
  }

}