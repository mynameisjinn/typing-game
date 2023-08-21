package com.hj.project01.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder // 빌더 패턴 사용
@Data // @getter, @setter, @ToString
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 모든 필드에 대한 생성자
public class ResultMst {
    private int resultId;
    private int speed;
    private int userId;
    private int quotesId;
    private LocalDateTime saveDate;

    private List<QuotesMst> quotesMst;
}
