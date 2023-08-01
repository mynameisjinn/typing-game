package com.hj.project01.service;

import com.hj.project01.entity.QuotesMst;
import com.hj.project01.repository.QuotesRepository;
import com.hj.project01.web.dto.QuotesReqDto;
import com.hj.project01.web.dto.SearchReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuotesService {

    @Autowired
    private QuotesRepository quotesRepository;

    public void registerQuotes(QuotesReqDto quotesReqDto){
        quotesRepository.saveQuotes(quotesReqDto);
    }

    public QuotesMst getQuotesById(int quotesId){
        return quotesRepository.findQuotesById(quotesId);
    }

    public List<QuotesMst> searchQuotes(SearchReqDto searchReqDto){
        return quotesRepository.searchQuotes(searchReqDto);
    }

    public void modifyQuotes( int quotesId, QuotesMst quotesMst){
        quotesMst.setQuotesId(quotesId);
        quotesRepository.updateQuotesById(quotesMst);
    }

    public void removeQuotes(int quotesId){
        quotesRepository.deleteQuotes(quotesId);
    }

}
