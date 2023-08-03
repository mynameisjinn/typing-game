package com.hj.project01.web.api;

import com.hj.project01.security.PrincipalDetails;
import com.hj.project01.security.PrincipalOAuth2DetailsService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/account")
public class AccountApi {

    private final PrincipalOAuth2DetailsService principalOAuth2DetailsService;

    @Autowired
    public AccountApi(PrincipalOAuth2DetailsService principalOAuth2DetailsService) {
        this.principalOAuth2DetailsService = principalOAuth2DetailsService;
    }

    @ApiOperation(value = "Get Principal", notes = "로그인된 사용자 정보 가져오기")
    @GetMapping("/principal")
    public ResponseEntity<?> getPrincipalDetails(@ApiParam(name = "principalDetails", hidden = true) @AuthenticationPrincipal PrincipalDetails principalDetails) {

        if(principalDetails != null) {
//            principalDetails.getAuthorities().forEach(role -> {
//                log.info("로그인된 사용자의 권한: {}", role.getAuthority());
//            });
            String provider = principalDetails.getProvider();
            if ("Google".equals(provider)) {
                log.info("Google 로그인 들어옴");
            } else if ("Naver".equals(provider)) {
                log.info("Naver 로그인 들어옴");
            } else {
                // 다른 인증 제공자일 때의 동작
            }

            principalDetails.getAuthorities().forEach(role -> {
                log.info("로그인된 사용자의 권한: {}", role.getAuthority());
            });
        }

        return ResponseEntity
                .ok()
                .body(principalDetails);
    }
}
