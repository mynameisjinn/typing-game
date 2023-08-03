package com.hj.project01.web.api;

import com.hj.project01.security.PrincipalDetails;
import com.hj.project01.service.ResultService;
import com.hj.project01.entity.ResultMst;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Api(tags = {"Typing Result API Controller"})
@RequestMapping("/api/typing")
@RestController
public class ResultApi {

    @Autowired
    private ResultService resultService;

//    @PostMapping("/typingresult")
//    public ResponseEntity<?> addResult(@RequestBody ResultMst resultMst){
//
//        return ResponseEntity.created(null)
//                .body(resultService.addResult(resultMst));
//    }

    @PostMapping("/result/{quotesId}")
    public ResponseEntity<?> saveResult(@PathVariable int quotesId,
                                        @Valid int speed,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
        resultService.addResult(speed, quotesId, principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(true);
    }

//    @PostMapping("/result/{quotesId}")
//    public ResponseEntity<?> saveResult(@PathVariable int quotesId,
//                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
//        resultService.addResult(quotesId,principalDetails.getUser().getUserId());
//        return ResponseEntity
//                .ok()
//                .body(true);
//    }
}
