import { createClient } from '@supabase/supabase-js';

import villagesData from './data.json';

interface VillageData {
  REFERENCE_DATE: string;
  APPN_DATE: string;
  LONGITUDE: string;
  HOLD_FCLTY: string;
  RDNMADR: string;
  EXPRN_CN: string;
  INSTITUTION_NM: string;
  INSTT_NM: string;
  EXPRN_AR: string;
  INSTT_CODE: string;
  EXPRN_VILAGE_NM: string;
  HOMEPAGE_URL: string;
  SIGNGU_NM: string;
  EXPRN_SE: string;
  LNMADR: string;
  PHONE_NUMBER: string;
  RPRSNTV_NM: string;
  LATITUDE: string;
  EXPRN_PIC_URL: string;
  CTPRVN_NM: string;
}

function transformVillageData(data: VillageData) {
  return {
    ctprvn_nm: data.CTPRVN_NM || '',
    signgu_nm: data.SIGNGU_NM || '',
    institution_nm: data.INSTITUTION_NM || '',
    rdnmadr: data.RDNMADR || '',
    exprn_village_nm: data.EXPRN_VILAGE_NM || '',
    homepage_url: data.HOMEPAGE_URL || '',
    rprsntv_nm: data.RPRSNTV_NM || '',
    phone_number: data.PHONE_NUMBER || '',
    latitude: data.LATITUDE || '',
    longitude: data.LONGITUDE || '',
    exprn_cn: data.EXPRN_CN || '',
    exprn_se: data.EXPRN_SE || '',
    exprn_ar: data.EXPRN_AR || '',
    exprn_pic_url: data.EXPRN_PIC_URL || '',
    instt_nm: data.INSTT_NM || '',
    instt_code: data.INSTT_CODE || '',
    lnmadr: data.LNMADR || '',
    hold_fclty: data.HOLD_FCLTY || '',
    appn_date: data.APPN_DATE || '',
    reference_date: data.REFERENCE_DATE || ''
  };
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function main() {
  console.log('Upserting to Supabase...');
  try {
    const transformedData = villagesData.map(transformVillageData);

    console.log(`총 ${transformedData.length}개의 데이터를 처리합니다.`);

    const batchSize = 1000;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);

      console.log(
        `배치 ${Math.floor(i / batchSize) + 1} 처리 중... (${i + 1}-${Math.min(
          i + batchSize,
          transformedData.length
        )})`
      );

      const { error } = await supabase.from('villages').upsert(batch, {
        onConflict: 'exprn_village_nm,ctprvn_nm,signgu_nm'
      });

      if (error) {
        console.error(`배치 ${Math.floor(i / batchSize) + 1} 오류:`, error);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`배치 ${Math.floor(i / batchSize) + 1} 성공: ${batch.length}개 처리됨`);
      }
    }

    console.log(`완료! 성공: ${successCount}개, 실패: ${errorCount}개`);
    console.log('Done.');
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
