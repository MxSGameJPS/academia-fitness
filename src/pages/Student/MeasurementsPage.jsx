import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaWeight,
  FaRuler,
  FaHeartbeat,
  FaCalendarAlt,
  FaChartLine,
  FaCamera,
  FaPlus,
} from "react-icons/fa";
import { useStudentStore } from "../../store/studentStore";
import { Button } from "../../components/ui/Button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MeasurementCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const CardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 0.25rem;
`;

const CardChange = styled.div`
  font-size: 0.9rem;
  color: ${({ $positive, theme }) =>
    $positive
      ? theme.colors.success
      : $positive === false
      ? theme.colors.error
      : theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.25rem;
  }
`;

const PanelTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ChartContainer = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ChartHeaderTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ChartFilters = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "white"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textPrimary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "rgba(0, 0, 0, 0.1)"};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.lightBackground};
  }
`;

const MeasurementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const MeasurementsTable = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TableHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBackground};
  }
`;

const TableHead = styled.th`
  text-align: left;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkAccent};
  font-size: 0.9rem;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  &.highlight {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  &.decrease {
    color: ${({ theme }) => theme.colors.success};
  }

  &.increase {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const PhotosPanel = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  overflow: hidden;
`;

const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PhotoCard = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PhotoImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const PhotoDate = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }
`;

const AddPhotoCard = styled.button`
  position: relative;
  height: 0;
  padding-bottom: 100%;
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lightBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const AddPhotoContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const MeasurementsPage = () => {
  const { student } = useStudentStore();
  const [chartPeriod, setChartPeriod] = useState("3m");

  // Dados de histórico simulados para o peso
  const mockWeightHistory = [
    { date: "2023-01-01", weight: 85 },
    { date: "2023-01-15", weight: 84.2 },
    { date: "2023-02-01", weight: 83.5 },
    { date: "2023-02-15", weight: 82.1 },
    { date: "2023-03-01", weight: 81.3 },
    { date: "2023-03-15", weight: 80.5 },
    { date: "2023-04-01", weight: 79.8 },
    { date: "2023-04-15", weight: 79.1 },
    { date: "2023-05-01", weight: 78.4 },
    { date: "2023-05-15", weight: 77.9 },
    { date: "2023-06-01", weight: 77.2 },
  ];

  // Dados de histórico simulados para medidas
  const mockMeasurementsHistory = [
    {
      date: "2023-01-01",
      weight: 85,
      chest: 103,
      waist: 92,
      arms: 36,
      thighs: 61,
    },
    {
      date: "2023-02-01",
      weight: 83.5,
      chest: 102,
      waist: 90,
      arms: 36.5,
      thighs: 60.5,
    },
    {
      date: "2023-03-01",
      weight: 81.3,
      chest: 101,
      waist: 88,
      arms: 37,
      thighs: 60,
    },
    {
      date: "2023-04-01",
      weight: 79.8,
      chest: 100,
      waist: 86,
      arms: 37.5,
      thighs: 59.5,
    },
    {
      date: "2023-05-01",
      weight: 78.4,
      chest: 99,
      waist: 84,
      arms: 38,
      thighs: 59,
    },
    {
      date: "2023-06-01",
      weight: 77.2,
      chest: 98,
      waist: 82,
      arms: 38.5,
      thighs: 58.5,
    },
  ];

  // Imagens simuladas de progresso
  const mockProgressPhotos = [
    {
      id: 1,
      date: "2023-01-01",
      image: "/images/progress-1.jpg",
    },
    {
      id: 2,
      date: "2023-03-01",
      image: "/images/progress-2.jpg",
    },
    {
      id: 3,
      date: "2023-05-01",
      image: "/images/progress-3.jpg",
    },
  ];

  // Filtrar dados baseado no período selecionado
  const filterDataByPeriod = (data) => {
    const now = new Date();
    let cutoffDate;

    switch (chartPeriod) {
      case "1m":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3m":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6m":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1y":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        cutoffDate = new Date(0); // Todos os dados
    }

    return data.filter((item) => new Date(item.date) >= cutoffDate);
  };

  const filteredWeightHistory = filterDataByPeriod(mockWeightHistory);

  // Dados para o gráfico de peso
  const weightChartData = {
    labels: filteredWeightHistory.map((record) => {
      const date = new Date(record.date);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    }),
    datasets: [
      {
        label: "Peso (kg)",
        data: filteredWeightHistory.map((record) => record.weight),
        fill: false,
        backgroundColor: "#4361EE",
        borderColor: "#4361EE",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Formatação de data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  // Cálculo de diferença de peso
  const calculateWeightDifference = () => {
    if (mockWeightHistory.length < 2) return { value: 0, percentage: 0 };

    const latest = mockWeightHistory[mockWeightHistory.length - 1].weight;
    const previous = mockWeightHistory[mockWeightHistory.length - 2].weight;
    const difference = latest - previous;
    const percentage = (difference / previous) * 100;

    return {
      value: difference.toFixed(1),
      percentage: percentage.toFixed(1),
    };
  };

  const weightDifference = calculateWeightDifference();

  return (
    <PageContainer>
      <div>
        <PanelTitle>
          <FaWeight /> Medidas e Evolução
        </PanelTitle>

        <CardContainer>
          <MeasurementCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardIcon>
              <FaWeight />
            </CardIcon>
            <CardTitle>Peso Atual</CardTitle>
            <CardValue>{student?.currentWeight} kg</CardValue>
            <CardChange $positive={Number(weightDifference.value) < 0}>
              {weightDifference.value > 0 ? "+" : ""}
              {weightDifference.value} kg (
              {weightDifference.value > 0 ? "+" : ""}
              {weightDifference.percentage}%)
            </CardChange>
          </MeasurementCard>

          <MeasurementCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardIcon>
              <FaRuler />
            </CardIcon>
            <CardTitle>Cintura</CardTitle>
            <CardValue>
              {
                mockMeasurementsHistory[mockMeasurementsHistory.length - 1]
                  .waist
              }{" "}
              cm
            </CardValue>
            <CardChange $positive={true}>-10 cm desde o início</CardChange>
          </MeasurementCard>

          <MeasurementCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <CardIcon>
              <FaHeartbeat />
            </CardIcon>
            <CardTitle>IMC</CardTitle>
            <CardValue>
              {(
                student?.currentWeight / Math.pow(student?.height / 100, 2)
              ).toFixed(1)}
            </CardValue>
            <CardChange $positive={true}>Saudável</CardChange>
          </MeasurementCard>

          <MeasurementCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <CardIcon>
              <FaRuler />
            </CardIcon>
            <CardTitle>Braços</CardTitle>
            <CardValue>
              {mockMeasurementsHistory[mockMeasurementsHistory.length - 1].arms}{" "}
              cm
            </CardValue>
            <CardChange $positive={true}>+2.5 cm desde o início</CardChange>
          </MeasurementCard>
        </CardContainer>
      </div>

      <ChartContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <ChartHeader>
          <ChartHeaderTitle>
            <FaChartLine /> Evolução do Peso
          </ChartHeaderTitle>
          <ChartFilters>
            <FilterButton
              $active={chartPeriod === "1m"}
              onClick={() => setChartPeriod("1m")}
            >
              1 mês
            </FilterButton>
            <FilterButton
              $active={chartPeriod === "3m"}
              onClick={() => setChartPeriod("3m")}
            >
              3 meses
            </FilterButton>
            <FilterButton
              $active={chartPeriod === "6m"}
              onClick={() => setChartPeriod("6m")}
            >
              6 meses
            </FilterButton>
            <FilterButton
              $active={chartPeriod === "1y"}
              onClick={() => setChartPeriod("1y")}
            >
              1 ano
            </FilterButton>
          </ChartFilters>
        </ChartHeader>

        <div style={{ height: "300px" }}>
          <Line data={weightChartData} options={chartOptions} />
        </div>
      </ChartContainer>

      <MeasurementsGrid>
        <MeasurementsTable
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <TableHeader>
            <ChartHeaderTitle>
              <FaRuler /> Histórico de Medidas
            </ChartHeaderTitle>
            <HeaderActions>
              <Button $color="light" $size="small">
                <FaPlus /> Nova Medição
              </Button>
            </HeaderActions>
          </TableHeader>

          <div style={{ overflowX: "auto" }}>
            <Table>
              <thead>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Peso (kg)</TableHead>
                  <TableHead>Tórax (cm)</TableHead>
                  <TableHead>Cintura (cm)</TableHead>
                  <TableHead>Braços (cm)</TableHead>
                  <TableHead>Pernas (cm)</TableHead>
                </TableRow>
              </thead>
              <tbody>
                {mockMeasurementsHistory.reverse().map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="highlight">
                      {formatDate(record.date)}
                    </TableCell>
                    <TableCell
                      className={
                        index > 0 &&
                        record.weight <
                          mockMeasurementsHistory[index - 1].weight
                          ? "decrease"
                          : index > 0 &&
                            record.weight >
                              mockMeasurementsHistory[index - 1].weight
                          ? "increase"
                          : ""
                      }
                    >
                      {record.weight}
                    </TableCell>
                    <TableCell>{record.chest}</TableCell>
                    <TableCell
                      className={
                        index > 0 &&
                        record.waist < mockMeasurementsHistory[index - 1].waist
                          ? "decrease"
                          : index > 0 &&
                            record.waist >
                              mockMeasurementsHistory[index - 1].waist
                          ? "increase"
                          : ""
                      }
                    >
                      {record.waist}
                    </TableCell>
                    <TableCell
                      className={
                        index > 0 &&
                        record.arms > mockMeasurementsHistory[index - 1].arms
                          ? "decrease"
                          : index > 0 &&
                            record.arms <
                              mockMeasurementsHistory[index - 1].arms
                          ? "increase"
                          : ""
                      }
                    >
                      {record.arms}
                    </TableCell>
                    <TableCell
                      className={
                        index > 0 &&
                        record.thighs <
                          mockMeasurementsHistory[index - 1].thighs
                          ? "decrease"
                          : index > 0 &&
                            record.thighs >
                              mockMeasurementsHistory[index - 1].thighs
                          ? "increase"
                          : ""
                      }
                    >
                      {record.thighs}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </MeasurementsTable>

        <PhotosPanel
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <ChartHeader>
            <ChartHeaderTitle>
              <FaCamera /> Fotos de Progresso
            </ChartHeaderTitle>
            <HeaderActions>
              <Button $color="light" $size="small">
                <FaPlus /> Adicionar Foto
              </Button>
            </HeaderActions>
          </ChartHeader>

          <PhotosGrid>
            {mockProgressPhotos.map((photo) => (
              <PhotoCard key={photo.id}>
                <PhotoImage src={photo.image} />
                <PhotoDate>
                  <FaCalendarAlt /> {formatDate(photo.date)}
                </PhotoDate>
              </PhotoCard>
            ))}

            <AddPhotoCard>
              <AddPhotoContent>
                <FaPlus />
                <span>Adicionar Foto</span>
              </AddPhotoContent>
            </AddPhotoCard>
          </PhotosGrid>
        </PhotosPanel>
      </MeasurementsGrid>
    </PageContainer>
  );
};

export default MeasurementsPage;
