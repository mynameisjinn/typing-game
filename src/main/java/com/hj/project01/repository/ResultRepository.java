package com.hj.project01.repository;

import com.hj.project01.entity.ResultMst;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ResultRepository {
    public int saveResult(ResultMst resultMst);
}
