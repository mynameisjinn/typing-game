package com.hj.project01.repository;

import com.hj.project01.entity.QuotesMst;
import com.hj.project01.web.dto.QuotesReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QuotesRepository {

    public int saveQuotes(QuotesReqDto quotesReqDto);
    public QuotesMst findQuotesById(String quotesId);
    public int updateQuotesById(QuotesReqDto quotesReqDto);
    public int deleteQuotes(String quotesId);
}
