package com.hj.project01.web.api;

import com.hj.project01.entity.QuotesMst;
import com.hj.project01.service.QuotesService;
import com.hj.project01.web.dto.QuotesReqDto;
import com.hj.project01.web.dto.SearchReqDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = {" typing 관리 API "})
@RestController
@RequestMapping("/api/quotes")
public class QuotesApi {
    @Autowired
    private QuotesService quotesService;

//    @PostMapping("/typingresult")
//    public ResponseEntity<?> addResult(@RequestBody ResultDto resultDto){
//
//        return ResponseEntity.created(null)
//                .body(resultService.addResult(resultDto));
//    }

    @PostMapping("/register")
    public ResponseEntity<?> registerQuotes(@Valid @RequestBody QuotesReqDto quotesReqDto,
                                            BindingResult bindingResult) {
        quotesService.registerQuotes(quotesReqDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(true);
    }
    @GetMapping("/id/{quotesId}")
    public ResponseEntity<?> getQuote(@PathVariable int quotesId){

        QuotesMst getOneQuote = quotesService.getQuotesById(quotesId);

        if (getOneQuote != null) {
            return ResponseEntity.ok(getOneQuote);
        } else {
            String errorMessage = "해당 아이디의 결과는 존재하지 않습니다";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<QuotesMst>> searchQuotes(@Valid SearchReqDto searchReqDto,
                                                        BindingResult bindingResult) {
//        return ResponseEntity
//                .ok()
//                .body(HttpStatus.OK.value(), "Successfully", quotesService.searchQuotes(quotesReqDto));
        List<QuotesMst> searchQuotesList = quotesService.searchQuotes(searchReqDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(searchQuotesList);
    }
    @PutMapping("/id/{quotesId}")
    public ResponseEntity<?> modifyQuotes(@PathVariable int quotesId,
                                          @Valid @RequestBody QuotesMst quotesMst) {
        quotesService.modifyQuotes(quotesId,quotesMst);
        QuotesMst getOneQuote = quotesService.getQuotesById(quotesId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(getOneQuote);
    }
    @DeleteMapping("/id/{quotesId}")
    public ResponseEntity<?> removeQuotes(@PathVariable int quotesId){
        quotesService.removeQuotes(quotesId);
        return ResponseEntity
                .ok()
                .body(true);
    }


}
