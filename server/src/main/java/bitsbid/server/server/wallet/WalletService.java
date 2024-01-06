package bitsbid.server.server.wallet;

import bitsbid.server.server.user.User;
import bitsbid.server.server.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletRepository walletRepository;

    public Long showWalletBalance(Long user_id){
        return userRepository.findById(user_id).get().getWallet().getBalance();
    }

    public Long showGhostBalance(Long user_id){
        return userRepository.findById(user_id).get().getWallet().getGhostBalance();
    }

    public Wallet showWallet(Long user_id){
        return userRepository.findById(user_id).get().getWallet();
    }

    public User addWalletBalance(Long user_id, Long balance){
        User user=userRepository.findById(user_id).get();
        if(user!=null){
            Wallet wallet=user.getWallet();
            wallet.setBalance(wallet.getBalance()+balance);
            userRepository.save(user);
            return user;
        }
        return null;
    }
}
