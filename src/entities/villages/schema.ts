/**
 * 마을 정보
 */

import { bigint, integer, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';

export const villages = pgTable(
  'villages',
  {
    village_id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    ctprvn_nm: text().notNull().default(''), // 시도명
    signgu_nm: text().notNull().default(''), // 시군구명
    institution_nm: text().notNull().default(''), // 관리기관명
    rdnmadr: text().notNull().default(''), // 소재지도로명주소
    exprn_village_nm: text().notNull().default(''), // 체험마을명
    homepage_url: text().notNull().default(''), // 홈페이지 주소
    rprsntv_nm: text().notNull().default(''), // 대표자명
    phone_number: text().notNull().default(''), // 대표전화번호
    latitude: text().notNull().default(''), // 위도
    longitude: text().notNull().default(''), // 경도
    exprn_cn: text().notNull().default(''), // 체험프로그램명
    exprn_se: text().notNull().default(''), // 체험프로그램구분
    exprn_ar: text().notNull().default(''), // 체험휴양마을면적
    exprn_pic_url: text().notNull().default(''), // 체험사진
    instt_nm: text().notNull().default(''), // 제공기관기관명
    instt_code: text().notNull().default(''), // 제공기관기관코드
    lnmadr: text().notNull().default(''), // 소재지지번주소
    hold_fclty: text().notNull().default(''), // 보유시설정보
    appn_date: text().notNull().default(''), // 지정일자
    reference_date: text().notNull().default(''), // 데이터기준일자 (최신업데이트 일자)
    likes: integer().notNull().default(0) // 좋아요 수
  },
  (table) => [
    uniqueIndex('unique_village').on(table.exprn_village_nm, table.ctprvn_nm, table.signgu_nm)
  ]
);
