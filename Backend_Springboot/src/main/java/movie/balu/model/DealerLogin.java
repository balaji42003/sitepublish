package movie.balu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="DealerLogin")
public class DealerLogin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String email;
	private String username;
	private String password;
	private String location;
	private String shopPhotoName;
	private String shopPhotoType;
	@Lob
	private byte[] shopPhotoData;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getShopPhotoName() {
		return shopPhotoName;
	}
	public void setShopPhotoName(String shopPhotoName) {
		this.shopPhotoName = shopPhotoName;
	}
	public String getShopPhotoType() {
		return shopPhotoType;
	}
	public void setShopPhotoType(String shopPhotoType) {
		this.shopPhotoType = shopPhotoType;
	}
	public byte[] getShopPhotoData() {
		return shopPhotoData;
	}
	public void setShopPhotoData(byte[] shopPhotoData) {
		this.shopPhotoData = shopPhotoData;
	}
	public DealerLogin(int id, String email, String username, String password, String location, String shopPhotoName, String shopPhotoType, byte[] shopPhotoData) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
		this.location = location;
		this.shopPhotoName = shopPhotoName;
		this.shopPhotoType = shopPhotoType;
		this.shopPhotoData = shopPhotoData;
	}
	public DealerLogin() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "DealerLogin [id=" + id + ", email=" + email + ", username=" + username + ", password=" + password + ", location=" + location + ", shopPhotoName=" + shopPhotoName + ", shopPhotoType=" + shopPhotoType + ", shopPhotoData=" + shopPhotoData + "]";
	}
	
}
