package com.hj.project01.web.api;

import com.hj.project01.security.PrincipalDetails;
import com.hj.project01.service.ResultService;
import com.hj.project01.entity.ResultMst;
import com.hj.project01.web.dto.SearchReqDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


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
                                        @RequestBody Map<String, Object> requestData,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
//        resultService.addResult(speed, principalDetails.getUser().getUserId(),quotesId);

//        int speed = (int) requestData.get("speed");
        int speed = Integer.parseInt((String) requestData.get("speed"));
        int resultId = resultService.addResult(speed, principalDetails.getUser().getUserId(), quotesId);

        if (resultId > 0) {
            return ResponseEntity.ok().body("Result added successfully. Result ID: " + resultId);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add result.");
        }
    }


    @GetMapping("/result")
    public ResponseEntity<?> getResult (SearchReqDto searchReqDto
                                        ,@AuthenticationPrincipal PrincipalDetails principalDetails){
//        if(principalDetails != null) {
//            searchReqDto.setUserId(principalDetails.getUser().getUserId());
//        }

        return ResponseEntity
                .ok()
                .body(resultService.getResult(searchReqDto));
    }
}
