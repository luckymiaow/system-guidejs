<!--
 * @Description: 
 * @Author: luckymiaow
 * @Date: 2022-05-29 14:17:15
 * @LastEditors: luckymiaow
-->

  ```typescript
import guidejs from 'system-guidejs';
import 'system-guidejs/lib/guide.min.css';   

const guide = new guidejs({
      allowClose: false,
    });
    guide.stepDefinition([
      {
        element: ['.name'],
        popover: {
          title: '【提示】',
          description: '0可手动录入“培训记录”或通过下载模板“批量导入普通话培训记录”。',
          closeBtnText: '跳过引导',
          nextBtnText: '下一步', // 当前步骤的下一步按钮文本 Next button text for this step
          position: 'left-center',
          onNext: () => {
            return new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          },
        },
      },
      {
        element: ['.phone', '.em'],
        elementIndex: 9,
        popover: {
          title: '【提示】',
          description: '1可手动录入“培训记录”或通过下载模板“批量导入普通话培训记录”。',
          closeBtnText: '跳过引导',
          nextBtnText: '下一步', // 当前步骤的下一步按钮文本 Next button text for this step
          position: 'right-center',
        },
      },
      {
        element: ['.option'],
        popover: {
          title: '【提示】',
          description: '2可手动录入“培训记录”或通过下载模板“批量导入普通话培训记录”。',
          nextBtnText: '完成', // 当前步骤的下一步按钮文本 Next button text for this step
          position: 'top-center',
        },
      },
    ]);

    guide.start();
  ```

