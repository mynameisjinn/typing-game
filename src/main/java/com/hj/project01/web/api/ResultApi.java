package com.hj.project01.web.api;

import com.hj.project01.service.ResultService;
import com.hj.project01.entity.ResultMst;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(tags = {"Typing Result API Controller"})
@RequestMapping("/api/result")
@RestController
public class ResultApi {

    @Autowired
    private ResultService resultService;

    @PostMapping("/typingresult")
    public ResponseEntity<?> addResult(@RequestBody ResultMst resultMst){

        return ResponseEntity.created(null)
                .body(resultService.addResult(resultMst));
    }
}
