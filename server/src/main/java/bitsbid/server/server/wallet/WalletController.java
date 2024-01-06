package bitsbid.server.server.wallet;

import bitsbid.server.server.user.User;
import bitsbid.server.server.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@Configuration
public class WalletController {
    @Autowired
    private WalletService walletService;

    @GetMapping("/balance/{userId}")
    public ResponseEntity<?> getWalletBalance(@PathVariable Long userId) {
        Long balance = walletService.showWalletBalance(userId);
        return ((balance == null) ?
                new ResponseEntity<>(balance, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.CONFLICT)
        );
    }

    @GetMapping("/ghost/{userId}")
    public ResponseEntity<?> getGhostBalance(@PathVariable Long userId) {
        Long balance = walletService.showGhostBalance(userId);
        return ((balance == null) ?
                new ResponseEntity<>(balance, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.CONFLICT)
        );
    }

    @GetMapping("/wallet/{userId}")
    public ResponseEntity<?> getWallet(@PathVariable Long userId) {
        Wallet wallet = walletService.showWallet(userId);
        return ((wallet == null) ?
                new ResponseEntity<>(wallet, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.CONFLICT)
        );
    }

    @PutMapping("/add/{userId}/balance/{balance}")
    public ResponseEntity<?> addWalletBalance(@PathVariable(name = "userId") Long userId, @PathVariable(name = "balance") Long balance) {
        User user = walletService.addWalletBalance(userId, balance);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
