import React, { memo } from "react";
import ChartCard from "@/pages/analysis/components/Charts/ChartCard";
import moment from "moment";

interface Props {
    state: {
        text?: string,
        value?: string
    };
    runInfo: {
        onlineTime?: string;
        offlineTime?: string;
    };
}
const DeviceState: React.FC<Props> = props => {
    const { state, runInfo } = props;
    return (
        <ChartCard
            title="设备状态"
            hoverable
            contentHeight={46}
            total={state?.text}
        >
            {
                state.value === 'online' ?
                    (
                        <span>上线时间：{moment(runInfo?.onlineTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    ) : (
                        <span>离线时间：{moment(runInfo?.offlineTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    )
            }
        </ChartCard>
    )
}
export default memo(DeviceState);