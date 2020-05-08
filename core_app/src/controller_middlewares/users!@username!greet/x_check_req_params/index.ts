import { params } from '@ag1/validate_request';
import { reqParamsSchemaMap } from '../req_type_helpers';
import { im } from '../../../utils/informative_middleware';

export const xCheckReqParams = im(params(reqParamsSchemaMap));
