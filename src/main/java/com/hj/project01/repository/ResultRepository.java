package com.hj.project01.repository;

import com.hj.project01.web.dto.ResultDto;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ResultRepository {
    public int saveResult(ResultDto resultDto);
}
