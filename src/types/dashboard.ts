export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string[]; // 선택 사항
  borderWidth?: number;
}

export interface DashboardData {
  labels: string[];
  datasets: ChartDataset[];
}
