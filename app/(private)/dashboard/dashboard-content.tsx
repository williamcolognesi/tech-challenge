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
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Landmark,
  ArrowLeftRight,
  Banknote,
  CircleDollarSign,
} from 'lucide-react';
import { TRANSACTION_TYPE, TRANSACTION_DIRECTION } from '@/features/transactions/model/constants';
import { MOCK_NEWS } from '@/mocks/news/data/news';
import type { ITransaction } from '@/features/transactions/model/transaction.types';

interface Props {
  balance: number;
  income: number;
  expense: number;
  recentTransactions: ITransaction[];
  revenueVsExpenses: Array<{ month: string; receitas: number; despesas: number }>;
  expensesByCategory: Array<{ name: string; value: number; color: string }>;
}



function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getTypeName(tipo: number) {
  const found = Object.values(TRANSACTION_TYPE).find((t) => t.codigo === tipo);
  return found?.descricao ?? 'Outro';
}

function getTypeIcon(tipo: number) {
  switch (tipo) {
    case TRANSACTION_TYPE.PIX.codigo:
      return <Zap size={14} />;
    case TRANSACTION_TYPE.DEPOSITO.codigo:
      return <Landmark size={14} />;
    case TRANSACTION_TYPE.TRANSFERENCIA.codigo:
      return <ArrowLeftRight size={14} />;
    case TRANSACTION_TYPE.SAQUE.codigo:
      return <Banknote size={14} />;
    default:
      return <CircleDollarSign size={14} />;
  }
}

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

export function DashboardContent({
  balance,
  income,
  expense,
  recentTransactions,
  revenueVsExpenses,
  expensesByCategory,
}: Props) {
  const absExpense = Math.abs(expense);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max lg:auto-rows-auto">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total"
              value={formatCurrency(balance)}
              badge={{
                text: balance >= 0 ? 'Positivo' : 'Negativo',
                color: balance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
              }}
              subtitle="Saldo atual"
            />
            <StatCard
              title="Receitas"
              value={formatCurrency(income)}
              badge={{ text: 'Entradas', color: 'bg-green-100 text-green-700' }}
              subtitle="Total de entradas"
            />
            <StatCard
              title="Despesas"
              value={formatCurrency(absExpense)}
              badge={{ text: 'Saídas', color: 'bg-red-100 text-red-700' }}
              subtitle="Total de saídas"
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Direção</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      Nenhuma transação encontrada.
                    </TableCell>
                  </TableRow>
                )}
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">
                      <span className="flex items-center gap-2">
                        {getTypeIcon(tx.tipo)}
                        {getTypeName(tx.tipo)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        {tx.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo ? (
                          <><TrendingUp size={12} className="text-green-600" /> Entrada</>
                        ) : (
                          <><TrendingDown size={12} className="text-red-600" /> Saída</>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(tx.valor)}
                    </TableCell>
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
              {revenueVsExpenses.length === 0 ? (
                <div className="flex items-center justify-center h-[250px] text-gray-500">
                  Nenhum dado disponível
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueVsExpenses}>
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
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Despesas por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expensesByCategory.length === 0 ? (
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  Nenhuma despesa cadastrada
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `R$ ${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
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
          {MOCK_NEWS.map((news) => (
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
