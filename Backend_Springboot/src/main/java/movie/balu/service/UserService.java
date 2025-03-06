package movie.balu.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import movie.balu.model.CustomerProduct;
import movie.balu.model.DealerLogin;
import movie.balu.model.DealerProduct;
import movie.balu.model.Product;
import movie.balu.model.User;
import movie.balu.repository.CustomerProductRepo;
import movie.balu.repository.DealerInfo;
import movie.balu.repository.DealerProductRepo;
import movie.balu.repository.ProductRepo;
import movie.balu.repository.Reposirory;

@Service
public class UserService {

    @Autowired
    private Reposirory repo;
    @Autowired
    private DealerProductRepo drepo;
    @Autowired
    private CustomerProductRepo crepo;
    @Autowired
    private DealerInfo dlrepo;
    @Autowired
    private ProductRepo pdrepo;

    public User SaveUser(User user) {
        return repo.save(user);
    }

    public DealerLogin SaveDealer(DealerLogin dealer, MultipartFile shopPhoto) throws IOException {
        if (shopPhoto != null && !shopPhoto.isEmpty()) {
            dealer.setShopPhotoName(shopPhoto.getOriginalFilename());
            dealer.setShopPhotoType(shopPhoto.getContentType());
            dealer.setShopPhotoData(shopPhoto.getBytes());
        }
        return dlrepo.save(dealer);
    }

    public User validate(User user) {
        User existingUser = repo.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        return null;
    }

    public DealerLogin validateDealer(DealerLogin dealer) {
        DealerLogin existingUser = dlrepo.findByUsername(dealer.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(dealer.getPassword())) {
            return existingUser;
        }
        return null;
    }

    public DealerProduct saveDealerProduct(DealerProduct dealerproduct) {
        return drepo.save(dealerproduct);
    }

    public boolean deleteProduct(int id) {
        if (drepo.existsById(id)) {
            drepo.deleteById(id);
            return true;
        }
        return false;
    }

    public CustomerProduct CustomerProduct(CustomerProduct customerproduct) {
        return crepo.save(customerproduct);
    }

    public List<CustomerProduct> getProductByCustid(int custid) {
        return crepo.findByCustid(custid);
    }

    public List<CustomerProduct> getAllCustomerProducts() {
        return crepo.findAll();
    }

    public List<DealerProduct> getAllProducts(int dealerId) {
        return drepo.findByDealerId(dealerId);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return pdrepo.save(product);
    }

    public List<Product> getAllProducts() {
        return pdrepo.findAll();
    }

    public Product getProductById(int productId) {
        return pdrepo.findById(productId).orElse(null);
    }

    public DealerLogin getDealerById(int dealerId) {
        return dlrepo.findById(dealerId).orElse(null);
    }

}
