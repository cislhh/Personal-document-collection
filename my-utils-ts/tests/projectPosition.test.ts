import { calculateProjectPositions } from "../src/projectPosition";

describe("calculateProjectPositions", () => {
  const mockProjects = [
    { id: "1", title: "Project A" },
    { id: "2", title: "Project B" },
    { id: "3", title: "Project C" },
  ];

  const containerWidth = 400;
  const itemWidth = 200;
  const spacing = 20;

  it("should return the correct number of positions", () => {
    const positions = calculateProjectPositions(
      mockProjects,
      containerWidth,
      itemWidth,
      spacing
    );
    expect(positions).toHaveLength(mockProjects.length);
  });

  it("should calculate correct position for first project", () => {
    const positions = calculateProjectPositions(
      mockProjects,
      containerWidth,
      itemWidth,
      spacing
    );
    expect(positions[0].position).toEqual({ x: 0, y: 0 });
  });

  it("should calculate correct position for second project", () => {
    const positions = calculateProjectPositions(
      mockProjects,
      containerWidth,
      itemWidth,
      spacing
    );
    expect(positions[1].position).toEqual({ x: 220, y: 0 });
  });

  it("should wrap to next row when exceeding container width", () => {
    const positions = calculateProjectPositions(
      mockProjects,
      containerWidth,
      itemWidth,
      spacing
    );
    expect(positions[2].position).toEqual({ x: 440 % containerWidth, y: 220 });
  });
});
