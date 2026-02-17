package learn.safe.auth_you.service;

import learn.safe.auth_you.io.ProfileRequest;
import learn.safe.auth_you.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);
}
