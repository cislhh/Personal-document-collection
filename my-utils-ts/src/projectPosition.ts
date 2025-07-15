// 定义项目基本信息接口
export interface Project {
  id: string;
  title: string;
}

// 定义位置信息接口
export interface Position {
  x: number;
  y: number;
}

/**
 * 根据项目数量和容器宽度计算每个项目的展示位置。
 *
 * @param projects 项目列表，每项包含 id 和 title
 * @param containerWidth 容器宽度（px）
 * @param itemWidth 单个项目的宽度（默认 200px）
 * @param spacing 项目之间的间距（默认 20px）
 * @returns 每个项目附带位置信息的数组
 */
export function calculateProjectPositions(
  projects: Project[],
  containerWidth: number,
  itemWidth: number = 200,
  spacing: number = 20
): { id: string; title: string; position: Position }[] {
  return projects.map((project, index) => {
    const x = index * (itemWidth + spacing); // 横向偏移
    const y = Math.floor(x / containerWidth) * (itemWidth + spacing); // 根据横向位置判断是否换行
    return {
      ...project,
      position: {
        x: x % containerWidth,
        y,
      },
    };
  });
}
