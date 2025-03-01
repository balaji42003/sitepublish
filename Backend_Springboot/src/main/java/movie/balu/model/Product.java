package movie.balu.model;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="product")
public class Product {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int dlid;
    private String name;
    private String description;
    private String brand;
    private double price;
    private  String category;
    private Date releaseDate;
    private boolean productAvailable;
    private int stockQuantity;
    private boolean rental; // Add rental field
    private double rentalAmount; // Add rental amount field

    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Product(Long id, int dlid, String name, String description, String brand, double price, String category,
			Date releaseDate, boolean productAvailable, int stockQuantity, String imageName, String imageType,
			byte[] imageDate, boolean rental, double rentalAmount) {
		super();
		this.id = id;
		this.dlid = dlid;
		this.name = name;
		this.description = description;
		this.brand = brand;
		this.price = price;
		this.category = category;
		this.releaseDate = releaseDate;
		this.productAvailable = productAvailable;
		this.stockQuantity = stockQuantity;
		this.imageName = imageName;
		this.imageType = imageType;
		this.imageDate = imageDate;
		this.rental = rental;
		this.rentalAmount = rentalAmount;
	}
	public int getDlid() {
		return dlid;
	}
	public void setDlid(int dlid) {
		this.dlid = dlid;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	public boolean isProductAvailable() {
		return productAvailable;
	}
	public void setProductAvailable(boolean productAvailable) {
		this.productAvailable = productAvailable;
	}
	public int getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(int stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public String getImageType(String contentType) {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	public byte[] getImageDate() {
		return imageDate;
	}
	public void setImageDate(byte[] imageDate) {
		this.imageDate = imageDate;
	}
	public boolean isRental() {
		return rental;
	}
	public void setRental(boolean rental) {
		this.rental = rental;
	}
	public double getRentalAmount() {
		return rentalAmount;
	}
	public void setRentalAmount(double rentalAmount) {
		this.rentalAmount = rentalAmount;
	}
	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", dlid=" + dlid + ", name=" + name + ", description=" + description + ", brand="
				+ brand + ", price=" + price + ", category=" + category + ", releaseDate=" + releaseDate
				+ ", productAvailable=" + productAvailable + ", stockQuantity=" + stockQuantity + ", imageName="
				+ imageName + ", imageType=" + imageType + ", imageDate=" + Arrays.toString(imageDate) + ", rental=" + rental + ", rentalAmount=" + rentalAmount + "]";
	}
}
