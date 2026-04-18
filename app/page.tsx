import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  BanknoteArrowDown,
  ChartSpline,
  Eye,
  Wallet,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className=" bg-white inline-flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch px-12 py-6 inline-flex justify-between items-center overflow-hidden">
        <div className="flex justify-start items-center gap-3 overflow-hidden">
          <div className="w-6 h-6 relative overflow-hidden">
            <Wallet />
          </div>
          <div className="text-center justify-center text-black text-2xl font-semibold leading-7">
            No Bolso.
          </div>
        </div>

        <Button variant="ghost" size="default">
          <Link href="/login">Acessar</Link>
        </Button>
      </div>
      <div className="self-stretch  py-36 bg-linear-to-b from-white/70 via-blue-300/70 to-white/70 flex flex-col justify-center items-center gap-6 overflow-hidden">
        <div className="px-4 py-1 bg-blue-200 rounded-md inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className="text-center justify-center text-black text-sm font-normal uppercase leading-5 tracking-wider">
            Controle financeiro descomplicado
          </div>
        </div>
        <div className="text-center justify-center text-black text-5xl font-semibold leading-12">
          Seu dinheiro, finalmente,
          <span className="text-blue-500"> no bolso</span>
        </div>
        <div className="text-center justify-center text-black text-lg font-normal leading-7">
          Pare de se perguntar para onde foi seu salário. Organize suas finanças
          em minutos e veja sua vida mudar de verdade.
          <br />
        </div>
        <div className="inline-flex justify-start items-center gap-6 overflow-hidden">
          <Button variant="default" size="lg">
            <Link href="/login">Cadastrar gratis</Link>
            <ArrowUpRight />
          </Button>

          <Button variant="outline" size="lg">
            <Link href="/login">Acessar</Link>
          </Button>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-center items-center gap-12 overflow-hidden">
        <div className="flex flex-col justify-start items-center gap-3">
          <div className="text-center justify-center text-black text-3xl font-semibold  leading-8">
            Esta com dificuldade de organizar suas finanças?
          </div>
          <div className="text-center justify-center text-black text-lg font-normal  leading-7">
            O <span className="text-blue-500 font-bold">No Bolso</span> resolve
            os problemas que tiram o sono de quem quer ter uma vida financeira
            saudável.
          </div>
        </div>
        <div className="self-stretch inline-flex justify-center items-center gap-6 overflow-hidden p-2 flex-col lg:flex-row">
          <Card className="w-full max-w-sm">
            <CardHeader className="gap-3">
              <div className="flex justify-start items-center p-2 w-fit rounded-sm text-white bg-blue-500 mb-">
                <BanknoteArrowDown />
              </div>
              <CardTitle>Salário que some</CardTitle>
            </CardHeader>
            <CardContent>
              Chega o fim do mês e você não sabe onde gastou. O No Bolso
              registra cada centavo e mostra exatamente para onde seu dinheiro
              está indo.
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm ">
            <CardHeader className="gap-3">
              <div className="flex justify-start items-center p-2 w-fit rounded-sm text-white bg-blue-500">
                <Eye />
              </div>
              <CardTitle>Falta de visão clara</CardTitle>
            </CardHeader>
            <CardContent>
              Sem saber sua real situação, qualquer decisão vira aposta. Tenha
              relatórios visuais e um panorama completo das suas finanças.
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm">
            <CardHeader className="gap-3">
              <div className="flex justify-start items-center p-2 w-fit rounded-sm text-white bg-blue-500">
                <ChartSpline />
              </div>
              <CardTitle>Metas que não saem do papel</CardTitle>
            </CardHeader>
            <CardContent>
              Chega o fim do mês e você não sabe onde gastou. O No Bolso
              registra cada centavo e mostra exatamente para onde seu dinheiro
              está indo.
            </CardContent>
          </Card>
        </div>

        <Button variant="default" size="lg">
          <Link href="/login">Quero organizar minhas finanças</Link>
          <ArrowUpRight />
        </Button>
        <div className="w-4 h-4 relative overflow-hidden">
          <div className="w-2 h-2 left-[4.17px] top-[4.17px] absolute bg-general-background" />
        </div>
      </div>
    </div>
  )
}
