import { OptionsHandler } from '../../handlers/options.handler';
import { ResponseType } from '../../models/response-type';

export function ReportProgress(reportProgress = true): MethodDecorator {
    return (target, propertyKey) => {
        OptionsHandler.handle(target, 'reportProgress', propertyKey as string, reportProgress);
    };
}
