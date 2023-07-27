package com.hj.project01.security;

import com.hj.project01.entity.UserMst;
import com.hj.project01.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrincipalOAuth2DetailsService extends DefaultOAuth2UserService {

    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        PrincipalDetails principalDetails = null;

        System.out.println("userRequest" + userRequest);
        System.out.println("ClientRegistration  >>> " + userRequest.getClientRegistration());
        System.out.println("Attributes >>> " + oAuth2User.getAttributes());
//        System.out.println("Attributes's email >>> " + oAuth2User.getAttributes().get("response"));

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> responseMap = (Map<String, Object>) attributes.get("response");
//        String naverEmail = (String) responseMap.get("email");

//        System.out.println("NaverEmail >>> " + naverEmail);

        String username = "";
        String name = "";

        String provider = userRequest.getClientRegistration().getClientName();

        if(provider == "Google"){
            username = (String) attributes.get("email");
        } else {
            username =(String) responseMap.get("email");
        }

        if(provider == "Google"){
            name = (String) attributes.get("email");
        } else {
            name =(String) responseMap.get("email");
        }

//        String username = email.substring(0, email.indexOf("@"));

        UserMst userMst = accountRepository.findUserByUsername(username);

        if (userMst == null) {
//            String name = (String) attributes.get("name");
            String password = new BCryptPasswordEncoder().encode(UUID.randomUUID().toString());

            userMst = UserMst.builder()
                    .username(username)
                    .password(password)
                    .name(name)
                    .provider(provider)
                    .build();

            accountRepository.saveUser(userMst);
            accountRepository.saveRole(userMst);
            userMst = accountRepository.findUserByUsername(username);

        } else if (userMst.getProvider() == null) {
            userMst.setProvider(provider);
            accountRepository.setUserProvider(userMst);
        }

        principalDetails = new PrincipalDetails(userMst, attributes);


        return principalDetails;
    }
}
