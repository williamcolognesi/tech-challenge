'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const barChartData = [
  { month: 'Jan', receitas: 4000, despesas: 2400 },
  { month: 'Fev', receitas: 3000, despesas: 1398 },
  { month: 'Mar', receitas: 5200, despesas: 9800 },
  { month: 'Abr', receitas: 4800, despesas: 3908 },
  { month: 'Mai', receitas: 6100, despesas: 4800 },
  { month: 'Jun', receitas: 5500, despesas: 3800 },
];

const pieChartData = [
  { name: 'Alimentação', value: 2400, color: '#ef4444' },
  { name: 'Transporte', value: 1398, color: '#f97316' },
  { name: 'Lazer', value: 1500, color: '#eab308' },
  { name: 'Saúde', value: 800, color: '#22c55e' },
  { name: 'Outros', value: 1200, color: '#06b6d4' },
];

const transactionsData = [
  { id: 1, name: 'Conta água', value: 'R$ 120,00', category: 'Casa' },
  { id: 2, name: 'Supermercado', value: 'R$ 350,50', category: 'Alimentação' },
  { id: 3, name: 'Netflix', value: 'R$ 39,90', category: 'Assinatura' },
];

const newsData = [
  {
    id: 1,
    title: 'Banco Central mantém taxa Selic em 10,5%',
    description: 'O Banco Central decidiu manter a taxa de juros estável conforme esperado pelo mercado financeiro.',
    date: '21 de Abril, 2024',
    category: 'Política Monetária',
    color: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Dólar fecha em alta de 2,3%',
    description: 'A moeda americana encerrou o pregão em valorização, impactando os ativos domésticos e carteira de investimentos.',
    date: '20 de Abril, 2024',
    category: 'Câmbio',
    color: 'bg-orange-50',
  },
  {
    id: 3,
    title: 'Ibovespa termina semana em queda de 1,8%',
    description: 'Principal índice da bolsa brasileira recua devido à cautela global e incertezas econômicas internacionais.',
    date: '19 de Abril, 2024',
    category: 'Bolsa',
    color: 'bg-red-50',
  },
  {
    id: 4,
    title: 'Inflação cai para 3,9% em março',
    description: 'O índice de inflação apresenta queda significativa, favorecendo a capacidade de compra dos consumidores.',
    date: '18 de Abril, 2024',
    category: 'Economia',
    color: 'bg-green-50',
  },
];

function StatCard({
  title,
  value,
  badge,
  subtitle,
}: {
  title: string;
  value: string;
  badge: { text: string; color: 'bg-green-100 text-green-700' | 'bg-red-100 text-red-700' };
  subtitle: string;
}) {
  return (
    <Card className="rounded-xl shadow-sm border border-gray-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm text-gray-600">{title}</p>
          <Badge className={`${badge.color} border-0`}>{badge.text}</Badge>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max lg:auto-rows-auto">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total"
              value="R$ 10,00"
              badge={{ text: '+12%', color: 'bg-green-100 text-green-700' }}
              subtitle="Valor com base no último mês"
            />
            <StatCard
              title="Receitas"
              value="R$ 20,00"
              badge={{ text: '+12%', color: 'bg-green-100 text-green-700' }}
              subtitle="Valor com base no último mês"
            />
            <StatCard
              title="Despesas"
              value="R$ 10,00"
              badge={{ text: '+12%', color: 'bg-red-100 text-red-700' }}
              subtitle="Valor com base no último mês"
            />
          </div>
        </div>

        <Card className="lg:row-span-2 rounded-xl shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Últimas transações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsData.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.name}</TableCell>
                    <TableCell>{tx.category}</TableCell>
                    <TableCell className="text-right font-semibold">{tx.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-xl shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Receitas vs Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `R$ ${value}`}
                  />
                  <Legend />
                  <Bar dataKey="receitas" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Despesas por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Últimas notícias do mundo financeiro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsData.map((news) => (
            <Card
              key={news.id}
              className={`rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${news.color}`}
            >
              <CardContent className="pt-6">
                <Badge className="mb-3 text-xs" variant="outline">
                  {news.category}
                </Badge>
                <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-2">
                  {news.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                  {news.description}
                </p>
                <p className="text-xs text-gray-500">{news.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
