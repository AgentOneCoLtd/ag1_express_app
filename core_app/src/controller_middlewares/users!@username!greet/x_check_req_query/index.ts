import { query } from '@ag1/validate_request';
import { reqQuerySchemaMap } from '../req_type_helpers';
import { im } from '../../../utils/informative_middleware';

export const xCheckReqQuery = im(query(reqQuerySchemaMap));
