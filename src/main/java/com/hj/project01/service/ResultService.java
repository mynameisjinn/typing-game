package com.hj.project01.service;

import com.hj.project01.repository.ResultRepository;
import com.hj.project01.entity.ResultMst;
import com.hj.project01.web.dto.SearchReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;

//    public int addResult(ResultMst resultMst) {
//        return resultRepository.saveResult(resultMst) > 0 ? resultMst.getResultId(): 0;
//    }

    public int addResult(int speed, int userId, int quotesId) {
        ResultMst resultMst = ResultMst.builder()
                .speed(speed)
                .userId(userId)
                .quotesId(quotesId)
                .build();

        int result = resultRepository.saveResult(resultMst);

        return result;
    }

    public List<ResultMst> getResult(SearchReqDto searchReqDto) {
        return resultRepository.getResult(searchReqDto);
    }
}
