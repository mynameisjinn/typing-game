package com.hj.project01.repository;

import com.hj.project01.entity.ResultMst;
import com.hj.project01.web.dto.SearchReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ResultRepository {
    public int saveResult(ResultMst resultMst);

    public List<ResultMst> getResult(SearchReqDto searchReqDto);
}
