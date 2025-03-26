import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaDownload,
  FaStar,
  FaBox,
  FaTag,
  FaMoneyBillWave,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { SectionTitle } from "../../components/ui/SectionTitle";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 1;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProductTable = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.lightGray};

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background: ${({ theme }) => theme.colors.bgLight};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  td {
    padding: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ProductImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-image: url(\${props => props.src});
  background-size: cover;
  background-position: center;
  margin-right: 0.75rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
`;

const ProductName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;

  ${({ status, theme }) => {
    if (status === "inStock") {
      return `
        background-color: ${theme.colors.successLight};
        color: ${theme.colors.success};
      `;
    } else if (status === "lowStock") {
      return `
        background-color: ${theme.colors.warningLight};
        color: ${theme.colors.warning};
      `;
    } else {
      return `
        background-color: ${theme.colors.dangerLight};
        color: ${theme.colors.danger};
      `;
    }
  }}
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(Button)`
  padding: 0.5rem;
  min-width: unset;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const PageSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.bgLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Price = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.success};
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textTertiary};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols || 1}, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-image: url(\${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: 1rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: 1.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgLight};
    cursor: pointer;
  }
`;

const ImageUploadLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const DetailList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;

  svg {
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const DetailValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // view, add, edit

  // Exemplo de dados de produtos
  const produtos = [
    {
      id: 1,
      name: "Whey Protein Isolado",
      category: "Suplementos",
      price: "R$ 149,90",
      status: "inStock",
      stock: 48,
      image: "https://images.unsplash.com/photo-1617886322168-72b886573c5f",
      description:
        "Whey Protein Isolado de alta qualidade com 27g de proteína por dose.",
    },
    {
      id: 2,
      name: "BCAA 2:1:1",
      category: "Suplementos",
      price: "R$ 79,90",
      status: "inStock",
      stock: 32,
      image: "https://images.unsplash.com/photo-1663169851353-ca1f7c1db9be",
      description: "BCAA na proporção 2:1:1 para recuperação muscular.",
    },
    {
      id: 3,
      name: "Creatina Monohidratada",
      category: "Suplementos",
      price: "R$ 89,90",
      status: "lowStock",
      stock: 10,
      image: "https://images.unsplash.com/photo-1627467959217-7fdeebceaff5",
      description:
        "Creatina pura monohidratada para aumento de força e performance.",
    },
    {
      id: 4,
      name: "Esteira Profissional",
      category: "Equipamentos",
      price: "R$ 8.999,90",
      status: "inStock",
      stock: 5,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f",
      description:
        "Esteira profissional com inclinação automática e monitor cardíaco.",
    },
    {
      id: 5,
      name: "Banco Ajustável",
      category: "Equipamentos",
      price: "R$ 699,90",
      status: "inStock",
      stock: 12,
      image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a",
      description: "Banco ajustável multiposição para diversos exercícios.",
    },
    {
      id: 6,
      name: "Kit Halteres 1-10kg",
      category: "Equipamentos",
      price: "R$ 1.299,90",
      status: "outOfStock",
      stock: 0,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      description: "Kit completo de halteres com peso de 1 a 10kg.",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const openModal = (product, mode) => {
    setSelectedProduct(product);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filtrar produtos com base na pesquisa e filtro
  const filteredProducts = produtos.filter((product) => {
    // Filtro de texto
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de categoria
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "supplements" && product.category === "Suplementos") ||
      (activeFilter === "equipment" && product.category === "Equipamentos") ||
      (activeFilter === "outOfStock" && product.status === "outOfStock");

    return matchesSearch && matchesFilter;
  });

  // Paginação
  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const getStatusLabel = (status) => {
    switch (status) {
      case "inStock":
        return "Em Estoque";
      case "lowStock":
        return "Estoque Baixo";
      case "outOfStock":
        return "Esgotado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Section>
      <PageHeader>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="primary" onClick={() => console.log("Pesquisar")}>
            <FaSearch />
          </Button>
        </SearchContainer>

        <ButtonsContainer>
          <Button color="secondary" onClick={() => handleFilterChange("all")}>
            Todos
          </Button>
          <Button
            color="secondary"
            onClick={() => handleFilterChange("supplements")}
          >
            Suplementos
          </Button>
          <Button
            color="secondary"
            onClick={() => handleFilterChange("equipment")}
          >
            Equipamentos
          </Button>
          <Button
            color="secondary"
            onClick={() => handleFilterChange("outOfStock")}
          >
            Esgotados
          </Button>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Novo Produto
          </Button>
        </ButtonsContainer>
      </PageHeader>

      <ProductTable>
        <Table>
          <TableHead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <NameCell>
                    <ProductImage src={product.image} />
                    <div>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.category}</ProductCategory>
                    </div>
                  </NameCell>
                </td>
                <td>{product.category}</td>
                <td>
                  <Price>{product.price}</Price>
                </td>
                <td>
                  <StatusBadge status={product.status}>
                    {getStatusLabel(product.status)}
                  </StatusBadge>
                </td>
                <td>{product.stock}</td>
                <td>
                  <ActionsCell>
                    <IconButton
                      title="Ver Detalhes"
                      color="secondary"
                      onClick={() => openModal(product, "view")}
                    >
                      <FaEye />
                    </IconButton>
                    <IconButton
                      title="Editar"
                      color="primary"
                      onClick={() => openModal(product, "edit")}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      title="Excluir"
                      color="danger"
                      onClick={() => console.log("Excluir", product.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </ActionsCell>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PageInfo>
            Mostrando {startIndex + 1}-
            {Math.min(startIndex + productsPerPage, filteredProducts.length)} de{" "}
            {filteredProducts.length} produtos
          </PageInfo>

          <PageSelector>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </PageButton>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                $active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </PageButton>
          </PageSelector>
        </Pagination>
      </ProductTable>

      {isModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                {modalMode === "add"
                  ? "Adicionar Novo Produto"
                  : modalMode === "edit"
                  ? "Editar Produto"
                  : "Detalhes do Produto"}
              </ModalTitle>
              <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              {modalMode === "view" && selectedProduct && (
                <div>
                  <ImagePreview src={selectedProduct.image} />
                  <DetailList>
                    <DetailItem>
                      <div>
                        <DetailLabel>Nome</DetailLabel>
                        <DetailValue>{selectedProduct.name}</DetailValue>
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div>
                        <DetailLabel>Categoria</DetailLabel>
                        <DetailValue>{selectedProduct.category}</DetailValue>
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div>
                        <DetailLabel>Preço</DetailLabel>
                        <DetailValue>{selectedProduct.price}</DetailValue>
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div>
                        <DetailLabel>Estoque</DetailLabel>
                        <DetailValue>
                          {selectedProduct.stock} unidades
                        </DetailValue>
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div>
                        <DetailLabel>Status</DetailLabel>
                        <DetailValue>
                          <StatusBadge status={selectedProduct.status}>
                            {getStatusLabel(selectedProduct.status)}
                          </StatusBadge>
                        </DetailValue>
                      </div>
                    </DetailItem>
                  </DetailList>
                  <div>
                    <DetailLabel>Descrição</DetailLabel>
                    <DetailValue>{selectedProduct.description}</DetailValue>
                  </div>
                </div>
              )}

              {(modalMode === "add" || modalMode === "edit") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formulário enviado");
                    closeModal();
                  }}
                >
                  <FormGroup>
                    <FormLabel htmlFor="product-image">
                      Imagem do Produto
                    </FormLabel>
                    <ImagePreview src={selectedProduct?.image || ""}>
                      <ImageUploadLabel htmlFor="image-upload">
                        <FaImage />
                        <span>Clique para fazer upload</span>
                      </ImageUploadLabel>
                      <ImageUploadInput
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          console.log("Imagem selecionada", e.target.files[0])
                        }
                      />
                    </ImagePreview>
                  </FormGroup>

                  <FormRow $cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="product-name">
                        Nome do Produto
                      </FormLabel>
                      <FormInput
                        id="product-name"
                        type="text"
                        required
                        placeholder="Ex: Whey Protein Isolado"
                        defaultValue={selectedProduct?.name || ""}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="product-category">
                        Categoria
                      </FormLabel>
                      <FormSelect
                        id="product-category"
                        required
                        defaultValue={selectedProduct?.category || ""}
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="Suplementos">Suplementos</option>
                        <option value="Equipamentos">Equipamentos</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Vestuário">Vestuário</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>

                  <FormRow $cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="product-price">Preço (R$)</FormLabel>
                      <FormInput
                        id="product-price"
                        type="text"
                        required
                        placeholder="Ex: 149,90"
                        defaultValue={
                          selectedProduct?.price?.replace("R$ ", "") || ""
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="product-stock">
                        Estoque (unidades)
                      </FormLabel>
                      <FormInput
                        id="product-stock"
                        type="number"
                        required
                        min="0"
                        placeholder="Ex: 50"
                        defaultValue={selectedProduct?.stock || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel htmlFor="product-status">Status</FormLabel>
                    <FormSelect
                      id="product-status"
                      required
                      defaultValue={selectedProduct?.status || "inStock"}
                    >
                      <option value="inStock">Em Estoque</option>
                      <option value="lowStock">Estoque Baixo</option>
                      <option value="outOfStock">Esgotado</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="product-description">
                      Descrição
                    </FormLabel>
                    <FormTextarea
                      id="product-description"
                      required
                      placeholder="Descreva o produto detalhadamente..."
                      defaultValue={selectedProduct?.description || ""}
                    />
                  </FormGroup>

                  <ModalFooter>
                    <Button
                      color="secondary"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      {modalMode === "add"
                        ? "Adicionar Produto"
                        : "Salvar Alterações"}
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default ProductsPage;
