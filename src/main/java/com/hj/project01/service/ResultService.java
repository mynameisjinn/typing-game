package com.hj.project01.service;

import com.hj.project01.repository.ResultRepository;
import com.hj.project01.entity.ResultMst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;

    public int addResult(ResultMst resultMst) {
        return resultRepository.saveResult(resultMst) > 0 ? resultMst.getResultId(): 0;
    }
}
