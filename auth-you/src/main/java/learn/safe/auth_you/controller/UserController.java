package learn.safe.auth_you.controller;


import jakarta.validation.Valid;
import learn.safe.auth_you.io.ProfileRequest;
import learn.safe.auth_you.io.ProfileResponse;
import learn.safe.auth_you.service.ProfileService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest profileRequest){
        ProfileResponse profileResponse = profileService.createProfile(profileRequest);
        //TODO: send welcome email for the register email
        return profileResponse;
    }

    @PostMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return profileService.getProfile(email);
    }

    @GetMapping("/authtest")
    public String testAuth(){
        return "Auth is working";
    }
}
