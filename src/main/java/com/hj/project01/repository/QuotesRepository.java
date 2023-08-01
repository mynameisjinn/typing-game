package com.hj.project01.repository;

import com.hj.project01.entity.QuotesMst;
import com.hj.project01.web.dto.QuotesReqDto;
import com.hj.project01.web.dto.SearchReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QuotesRepository {

    public int saveQuotes(QuotesReqDto quotesReqDto);

    public QuotesMst findQuotesById(int quotesId);
    public List<QuotesMst> searchQuotes(SearchReqDto searchReqDto);
    public int updateQuotesById(QuotesMst quotesMst);
    public int deleteQuotes(int quotesId);
}
