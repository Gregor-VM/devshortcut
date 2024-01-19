interface Props{
    children: any
    color?: string
}

export default function HoverEffect({children, color = "text-purple-400"}: Props) {

    return <div class="group relative">
    {children}
    <div class={`absolute left-0 top-0 w-6 h-6 block opacity-1 ${color} blur-lg hover:blur-md transition-all`}>
        {children}
    </div>
    <div class={`absolute left-0 top-0 w-6 h-6 block opacity-1 ${color} blur-lg hover:blur-sm transition-all hover:opacity-60 opacity-0`}>
        {children}
    </div>
    </div>
  }
