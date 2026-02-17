package learn.safe.auth_you.controller;


import learn.safe.auth_you.io.ProfileRequest;
import learn.safe.auth_you.io.ProfileResponse;
import learn.safe.auth_you.service.ProfileService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@RequestBody ProfileRequest profileRequest){
        ProfileResponse profileResponse = profileService.createProfile(profileRequest);
        //TODO: send welcome email for the register email
        return profileResponse;
    }
}
